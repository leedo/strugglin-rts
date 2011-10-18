include $(GOROOT)/src/Make.inc

TARG=stryfe

GOFILES=\
  world.go \
  cell.go \
  player.go \
  server.go \
  zone.go \
	
stryfe: stryfe.$(O)
	$(LD) -L _obj -o stryfe stryfe.$(O)

stryfe.$(O): main.go _obj/stryfe.a
	$(GC) -I_obj -o $@ main.go

$(GOBIN)/stryfe: stryfe
	cp stryfe $@

INSTALLFILES+=$(GOBIN)/stryfe
CLEANFILES+=$(GOBIN)/stryfe
CLEANFILES+=./stryfe

include $(GOROOT)/src/Make.pkg
